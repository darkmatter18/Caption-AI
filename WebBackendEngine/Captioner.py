import os
import torch
import pickle
from torchvision.transforms import Compose, CenterCrop, ToTensor, Normalize


class Captioner:
    def __init__(self, ):
        # Model paths
        models_path = os.path.join(os.getcwd(), 'models')
        utils_dir = os.path.join(os.getcwd(), 'utils')
        encoder_path = os.path.join(models_path, "encoder.pt")
        decoder_path = os.path.join(models_path, "decoder.pt")

        # Set Vocab
        with open(os.path.join(utils_dir, 'vocab.pkl'), 'rb') as f:
            vocab = pickle.load(f)
            self.word2idx = vocab.word2idx
            self.idx2word = vocab.idx2word

        # Model Hyper parameters
        self.device = torch.device("cpu")
        self.hidden_size = 512

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

    def init_hidden(self, batch_size):
        return (torch.zeros(3, batch_size, self.hidden_size, device=self.device),
                torch.zeros(3, batch_size, self.hidden_size, device=self.device))

    def preprocessing(self, image):
        imageT = self.transform(image.resize((224, 224)))

    def result(self, image):

        image.save("image.jpg")
        print("Result  ", self.a)
