from drf_auto_endpoint.router import register, router
from drf_auto_endpoint.endpoints import Endpoint

from .models import Payment
from .serializers import ConsumerPaymentSerializer, VendorPaymentSerializer

from .views import ConsumerPaymentViewset, VendorPaymentViewset



class ConsumerPaymentEndpoint(Endpoint):
    serializer = ConsumerPaymentSerializer
    model = Payment
    viewset = ConsumerPaymentViewset


class VendorPaymentEndpoint(Endpoint):
    serializer = VendorPaymentSerializer
    model = Payment
    viewset = VendorPaymentViewset
