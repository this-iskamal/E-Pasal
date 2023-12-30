from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, ProductImage,SearchHistoryModel,ProductDetail
from PurchaseHistory.models import SellerorderHistory
from rest_framework.decorators import api_view, permission_classes
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from django.db.models import Q
import json
from django.http import Http404

def calculate_similarity(products):
    # Extract product descriptions
    descriptions = [product.description or "" for product in products]

    # Use TF-IDF vectorizer to convert descriptions to numerical vectors
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(descriptions)

    # Calculate the cosine similarity between product descriptions
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

    return cosine_similarities



# views.py

class ProductCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_serializer = ProductSerializer(data=request.data)
       
        if product_serializer.is_valid():
            product_instance = product_serializer.save()

            # Handle product images
            images_data = [
                request.FILES[key] for key in request.FILES if key.startswith("image")
            ]

            for image_data in images_data:
                ProductImage.objects.create(product=product_instance, image=image_data)

            # Handle product details
            product_details_json = request.data.get('productDetails', '[]')
            product_details = json.loads(product_details_json)

# Processing the productDetails data
            for detail in product_details:
                name = detail.get('name', '')
                value = detail.get('value', '')
                ProductDetail.objects.create(product=product_instance, name=name, value=value)

            # Update total_products in SellerorderHistory
            seller_order_history = SellerorderHistory.objects.get(seller=request.user)
            seller_order_history.total_products = Product.objects.filter(seller=request.user).count()
            seller_order_history.save()

            return Response({'message': "Successfully created", 'data': product_serializer.data, 'success': True}, status=status.HTTP_201_CREATED)

        return Response({'message': product_serializer.errors, 'success': False}, status=status.HTTP_400_BAD_REQUEST)



class ProductListView(APIView):
    permission_classes= [AllowAny]
    def get(self, request, format=None):
        products = Product.objects.all()
        
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class ProductDetailView(APIView):

    def get_product(self,id):
        print(f"Product ID received: {id}")
        try:
            return Product.objects.get(id=id)
           
        except Product.DoesNotExist:
            return None

    def get(self, request, product_name, id):
        try:
            product = Product.objects.get(id=id)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, product_name, id):
        print(f"Attempting to delete product with ID: {id}")

        product = self.get_product(id)
        if product:
            # Get the seller associated with the product
            seller = product.seller

            # Delete related images
            product_images = ProductImage.objects.filter(product=product)
            for product_image in product_images:
                product_image.image.delete()
                product_image.delete()

            # Delete the product
            product.delete()

            # Update total_products in SellerorderHistory
            seller_order_history = SellerorderHistory.objects.get(seller=seller)
            seller_order_history.total_products = Product.objects.filter(seller=seller).count()
            seller_order_history.save()

            return Response({"message": "Product deleted"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        


    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            raise Http404

    def patch(self, request, id,product_name, format=None):
        product = self.get_object(id)
        serializer = ProductSerializer(product, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            # You can add additional logic here if needed

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

    


class SellerProductsView(APIView):
    permission_classes = [IsAuthenticated]
    
    
    def get(self, request, id, format=None):
        print("Seller ID:", id)
        id1 = id[5:]
        id2=int(id1)
        print(id2)
        try:
            products = Product.objects.filter(seller_id=id2)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"error": "Products not found"}, status=status.HTTP_404_NOT_FOUND)
        





class ProductSearchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        sort_by = request.query_params.get('sort', 'default')
        query = request.query_params.get('query', '')

        products = Product.objects.filter(product_name__icontains=query)

        serializer = None  # Initialize serializer outside the if block

        if products:
            if sort_by == 'price-low':
                products = products.order_by('price')
            elif sort_by == 'price-high':
                products = products.order_by('-price')
            serializer = ProductSerializer(products, many=True)

        if serializer is not None:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Return an empty list if no products are found
            return Response([], status=status.HTTP_200_OK)

    
@api_view(['GET'])
@permission_classes([AllowAny])
def get_products_by_category(request, category):
    # Get sorting option from query parameters
    sort_by = request.query_params.get('sort', 'default')

    if(category=="freedelivery"):
        products = Product.objects.filter( freeDelivery=True)
    elif(category=="newarrival"):
        products = Product.objects.filter( isNewArrival=True)
    elif(category=="beauty"):
        products = Product.objects.filter( isbeauty=True)
    elif(category=="popular"):
        products = Product.objects.filter( popular=True)
    elif(category=="toprated"):
        products = Product.objects.filter( topRated=True)
    elif(category=="bestseller"):
        products = Product.objects.filter( bestSeller=True)

    # Sort products based on the sorting option
    if sort_by == 'price-low':
        products = products.order_by('price')
    elif sort_by == 'price-high':
        products = products.order_by('-price')

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# class SimilarProductsView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, productId, format=None):
#         try:
#             product = Product.objects.get(id=productId)
#             category = product.category
#             products = Product.objects.filter(category=category)
#             serializer = ProductSerializer(products, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Product.DoesNotExist:
#             return Response({"error": "Products not found"}, status=status.HTTP_404_NOT_FOUND)


class SimilarProductsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, productId, format=None):
        try:
            product = Product.objects.get(id=productId)
            category = product.category

            # Get all products in the same category
            products = list(Product.objects.filter(category=category))

            # Calculate similarity matrix
            similarity_matrix = calculate_similarity(products)

            # Find the index of the current product
            current_product_index = next(
                (index for index, p in enumerate(products) if p.id == productId),
                None
            )

            if current_product_index is not None:
                # Get the similarity scores for the current product
                similarity_scores = similarity_matrix[current_product_index]

                # Get the indices of products with high similarity
                similar_product_indices = similarity_scores.argsort()[:-6:-1]  # Select top 2 products

                # Get the actual similar products with a similarity score greater than 0
                similar_products = [products[i] for i in similar_product_indices if similarity_scores[i] > 0]
                print(similar_products)

                serializer = ProductSerializer(similar_products, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({"error": "Products not found"}, status=status.HTTP_404_NOT_FOUND)

        


class RecommendProductsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        
        if request.user.is_authenticated:
            print(request.user)
            query = request.query_params.get('query', '')  # Modify this based on your query parameter
            self.add_search_history(request.user, query)
            return Response({"message":"search history added"},status=status.HTTP_200_OK)
        return Response({"message":"user not found"},status=status.HTTP_200_OK)


    def get(self, request, format=None):
        # Your existing logic to retrieve all products
        products = Product.objects.all()

        # If the user is authenticated, add a search history entry
        user = request.user
        if user:
            # Retrieve last three searches for the current user
            last_three_searches = SearchHistoryModel.objects.filter(user=request.user).order_by('-timestamp')[:3]
            
            

            # Retrieve products based on each search
            recommended_products = []
            for search in last_three_searches:
                print(search.query)
                products_from_search = self.get_products_based_on_search(search.query)
                
                recommended_products.extend(products_from_search)

            # Filter and remove duplicates
            recommended_products = list(set(recommended_products))
           

            # Sort products by some criteria if needed
            recommended_products.sort(key=lambda x: x.price)

            # Combine the recommended products with the original products
            combined_products = recommended_products #+ list(products)
            
            serializer = ProductSerializer(combined_products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def add_search_history(self, user, query):
        # Check if the user is authenticated before adding search history
        if user.is_authenticated:
            # Your logic to add a new entry to the search history
            SearchHistoryModel.objects.create(user=user, query=query)
        else:
            # Handle the case when the user is not authenticated (Optional)
            pass
        
    # def get_products_based_on_search(self, query):
    #     # Your logic to retrieve products based on the search query
        
    #     products = Product.objects.filter(Q(description__contains=query) | Q(product_name__contains=query))
      
        

    #     # If no products match the query, return an empty list
    #     if not products.exists():
    #         return []

    #     # Convert the queryset to a list
    #     products_list = list(products)

    #     # Get the index of the product in the list
    #     query_product_index = next(
    #         (index for index, product in enumerate(products_list) if product.description.lower().find(query.lower()) != -1),
    #         None
    #     )

    #     if query_product_index is None:
    #         return []  # Product not found in the list

    #     # Extract product descriptions
    #     product_descriptions = [product.description for product in products_list]     

    #     # Use TF-IDF to vectorize the product descriptions
    #     vectorizer = TfidfVectorizer(stop_words='english')
    #     tfidf_matrix = vectorizer.fit_transform(product_descriptions)

    #     # Calculate cosine similarity between products
    #     cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

    #     # Get the similarity scores for the query product
    #     similarity_scores = cosine_similarities[query_product_index]

    #     # Get the indices of products with high similarity
    #     similar_product_indices = similarity_scores.argsort()[:-6:-1]  # Adjust this to get more or fewer similar products
         

    #     # Get the actual similar products
    #     similar_products = [products_list[i] for i in similar_product_indices]

    #     return similar_products


    def get_products_based_on_search(self, query):
    # Your logic to retrieve products based on the search query
        products = Product.objects.filter(Q(description__contains=query) | Q(product_name__contains=query))

        # If no products match the query, return an empty list
        if not products.exists():
            return []

        # Convert the queryset to a list
        products_list = list(products)
        

        # Get the indices of products with high similarity
        similar_product_indices = self.get_similar_product_indices(query, products_list)
        

        # Get the actual similar products
        similar_products = [products_list[i] for i in similar_product_indices]
  
      
        return similar_products



    def get_similar_product_indices(self, query, products_list):
    # Extract product descriptions and names
        product_descriptions = [product.description for product in products_list]
        product_names = [product.product_name for product in products_list]

        # Combine descriptions and names for TF-IDF vectorization
        combined_texts = [f"{description} {product_name}" for description, product_name in zip(product_descriptions, product_names)]
        

        # Use TF-IDF to vectorize the combined texts
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(combined_texts)

        # Calculate cosine similarity between products
        cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

        # Get the index of the product in the list
        query_product_index = next(
            (index for index, product in enumerate(products_list) if (Q(product.description.lower().find(query.lower()))|Q(product.product_name.lower().find(query.lower()))) != -1),
            None
        )

        if query_product_index is None:
            return []  # Product not found in the list

        # Get the similarity scores for the query product
        similarity_scores = cosine_similarities[query_product_index]
       
        # Get the indices of products with high similarity
        similar_product_indices = similarity_scores.argsort()[:-6:-1]  # Adjust this to get more or fewer similar products
        

        return similar_product_indices
