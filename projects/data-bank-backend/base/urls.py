# import urls
from django.urls import path
from .views import DocumentUploadView, UserNFTsView, AssetDetailsView

urlpatterns = [
    path('document-upload/', DocumentUploadView.as_view(), name='document_upload'),
    path('user-nfts/', UserNFTsView.as_view(), name='user_nfts'),
    path('asset-details/', AssetDetailsView.as_view(), name='asset_details'),
    # Add other paths as needed
]