from .models import Consumer
from django import forms
from django.contrib.auth.forms import UserCreationForm


class ConsumerForm(UserCreationForm):
    # first_name = forms.CharField()
    # last_name = forms.CharField()
    pin = forms.IntegerField(help_text='A 4-number pin to verify your figs')
    image = forms.ImageField(help_text='Image so you can fig yourself')
    first_name = forms.CharField()
    last_name = forms.CharField()
    #class Meta(UserCreationForm.Meta):
    #    fields = UserCreationForm.Meta.fields + ('pin', 'image')  # 'first_name', 'last_name'
