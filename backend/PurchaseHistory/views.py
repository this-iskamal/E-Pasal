from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import PurchaseHistory,SellerorderHistory,DailySales,CategorySales
from .serializers import PurchaseHistorySerializer,PurchaseHistorySerializer1,SellerorderHistorySerializer,DailySalesSerializer,CategorySalesSerializer


class PurchaseHistoryListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        purchase_history = PurchaseHistory.objects.filter(user_id=user).select_related('product')
        serializer = PurchaseHistorySerializer1(purchase_history, many=True)
        return Response(serializer.data)
    

class SellerOrderHistory(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Assuming you have a seller field in your Product model
        # Adjust the filtering based on your actual models and relationships
        seller_orders = PurchaseHistory.objects.filter(product__seller=request.user)
        serializer = PurchaseHistorySerializer1(seller_orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SellerDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        try:
            seller_order_history = SellerorderHistory.objects.get(seller=request.user)

            # Fetch related DailySales instances for the seller_order_history
            daily_sales = DailySales.objects.filter(seller_history=seller_order_history)
            daily_sales_serializer = DailySalesSerializer(daily_sales, many=True)


            category_sales = CategorySales.objects.filter(seller_history=seller_order_history)
            category_sales_serializer = CategorySalesSerializer(category_sales, many=True)

            # Serialize SellerorderHistory along with DailySales
            serializer = SellerorderHistorySerializer(seller_order_history)
            data = serializer.data
            data['daily_sales'] = daily_sales_serializer.data
            data['category_sales'] = category_sales_serializer.data

            return Response(data, status=status.HTTP_200_OK)
        except SellerorderHistory.DoesNotExist:
            return Response({'error': 'No data found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class ConfirmOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            order = PurchaseHistory.objects.get(id=pk)

            if order.status == 'pending': 
                # Check if SellerOrderHistory already exists for the seller
                seller_order_history, created = SellerorderHistory.objects.get_or_create(
                    seller=request.user,
                    defaults={
                        'total_products': 0,
                        'total_revenue': 0.0,
                        'total_customers': 0,
                        'total_orders': 0,
                    }
                )

                # Check if DailySales entry exists for the seller and date
                daily_sales, created = DailySales.objects.get_or_create(
                    seller_history=seller_order_history,
                    date=order.purchase_date.date(),  # Assuming purchase_date is a DateTimeField
                    defaults={
                        'number_of_sales': 0,
                    }
                )

                # Check if CategorySales entry exists for the seller and category
                category_sales, created = CategorySales.objects.get_or_create(
                    seller_history=seller_order_history,
                    category=order.product.category,  # Assuming product has a category field
                    defaults={
                        'sales': 0,
                    }
                )
                print(category_sales)

                if(order.user.email not in seller_order_history.customers_emails):
                    seller_order_history.customers_emails.append(order.user.email)
                    seller_order_history.total_customers += 1
                
                seller_order_history.total_orders += 1
                seller_order_history.total_revenue += order.total_cost
                seller_order_history.save()

                daily_sales.number_of_sales += 1
                daily_sales.save()

                category_sales.sales += 1
                category_sales.save()

                # Update the order status to 'confirmed'
                order.status = 'confirmed'
                order.save()

                return Response({'message': 'Order confirmed successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Order is not pending'}, status=status.HTTP_400_BAD_REQUEST)
        except PurchaseHistory.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreatePurchaseHistoryView(APIView):
    def post(self, request, format=None):
        serializer = PurchaseHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PurchaseHistoryDetailView(APIView):
    def get_object(self, pk):
        try:
            return PurchaseHistory.objects.get(pk=pk)
        except PurchaseHistory.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk, format=None):
        purchase_history = self.get_object(pk)
        serializer = PurchaseHistorySerializer(purchase_history)
        return Response(serializer.data)
