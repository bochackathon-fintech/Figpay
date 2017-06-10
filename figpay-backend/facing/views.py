# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import parsers
from .models import Upload
from .forms import FileFieldForm
import datetime
import tempfile
import io
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse

from .serializers import UploadedBase64ImageSerializer
from rest_framework.renderers import JSONRenderer

"""
def post(self, request, format=None):

    upload = request.FILES['file']
    fh = tempfile.NamedTemporaryFile(delete=False)

    extension = upload.name.split(".")[1]
    now = datetime.datetime.now().strftime("%d_%m_%y_%H_%M_%S")
    filename = "{}.{}".format(fh.name, extension)

    with io.BufferedWriter(io.FileIO(filename, "w")) as dest:
        for c in upload.chunks():
            dest.write(c)


    upload = Upload.objects.create(
        owner=request.user.vendor,
        url="http://example.com/uploads/{name}".format(
            name=filename.split("/")[2]),
        path_to_image=filename)
    upload.start_ocr_tasks()




def post(self, request, format=None):
    form = FileFieldForm(request.POST, request.FILES)
    files = request.FILES.getlist('files')
    vendor = request.user.vendor
    if form.is_valid():
        for f in files:
            upload = Upload.objects.create(
                owner=vendor,
                image_1=f)
        return Response({"success": True}, status=status.HTTP_201_CREATED)
    else:
        return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)

"""


class UploadList(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    renderer_classes = (JSONRenderer,)

    def post(self, request, format=None):
        vendor = request.user.vendor
        serializer = UploadedBase64ImageSerializer(data=request.data)
        if serializer.is_valid():
            # vendor = Vendor.objects.get(user__username='zentar')
            upload = Upload(owner=vendor, image_1=serializer.validated_data['file'])
            upload.save()
            result = upload.recognize()
            if result['prof'] is not None:
                json_data = {"success": True,
                             "data": {"userId": str(result['prof'].id), "name": result['prof'].fullname}}
                status_to_send = status.HTTP_200_OK
            else:
                if result['status'] == 404:
                    status_to_send = status.HTTP_404_NOT_FOUND
                else:
                    status_to_send = status.HTTP_400_BAD_REQUEST
                json_data = {"success": False, "data": {"userId": "", "name": ""}}
        else:
            json_data = serializer.errors
            status_to_send = status.HTTP_400_BAD_REQUEST

        return Response(json_data, status=status_to_send, content_type="application/json")
