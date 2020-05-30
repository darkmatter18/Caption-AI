import os
import torch
from torchvision.transforms import Compose, CenterCrop, ToTensor, Normalize


class Captioner:
    def __init__(self, ):
        models_path = os.path.join(os.getcwd(), 'models')
        encoder_path = os.path.join(models_path, "encoder.pt")
        decoder_path = os.path.join(models_path, "decoder.pt")
        print(encoder_path)
        print("Captioner Starting..")
        self.transform = Compose([
            CenterCrop(224),
            ToTensor(),
            Normalize((0.485, 0.456, 0.406),
                      (0.229, 0.224, 0.225))
        ])

        print("Setting Models...")
        self.encoder = torch.jit.load(encoder_path)
        self.decoder = torch.jit.load(decoder_path)
        print("Model Setting Done...")

    def preprocessing(self, image):
        imageT = self.transform(image.resize((224, 224)))

    def result(self, image):

        image.save("image.jpg")
        print("Result  ", self.a)
