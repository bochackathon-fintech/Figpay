from .models import Consumer
from django import forms
from django.contrib.auth.forms import UserCreationForm


class ConsumerForm(UserCreationForm):
    # first_name = forms.CharField()
    # last_name = forms.CharField()
    pin = forms.PasswordInput()
    image = forms.ImageField()

    class Meta:
        model = Consumer
        fields = UserCreationForm.Meta.fields + ['pin', 'image']  # 'first_name', 'last_name'
