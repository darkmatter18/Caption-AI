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

    def preprocessing(self, image):
        """
        PIL image Preprocessing function
        :param image: PIL image
        :return: (Torch.Tensor) transformed image
        """
        image = image.resize((224, 224))
        image_t = self.transform(image)
        return image_t.unsqueeze(0)

    def init_hidden(self, batch_size):
        """
        Init the LSTM hidden tensors
        :param batch_size: Batch size of input tensor
        :return: (h0, c0) hidden tensors
        """
        return (torch.zeros(3, batch_size, self.hidden_size, device=self.device),
                torch.zeros(3, batch_size, self.hidden_size, device=self.device))

    def clean_sentence(self, output):
        """
        Outputs the clean sentence from the model
        :param output: list of output
        :return: the clean sentence
        """
        parts = [self.idx2word[i] for i in output][1:-1]
        sentence = " ".join(parts)
        return sentence

    def decoder_result(self, features):
        """
        Decoder Forward pass
        :param features: (Torch.Tensor) Features from the encoder
        :return: (list) Output list
        """
        max_len = 20
        word_list = list()
        word_len = 0
        hidden = self.init_hidden(1)

        with torch.no_grad():
            while word_len < max_len:
                out, features, hidden = decoder_jit(features, hidden)
                word_list.append(out.item())
                word_len += 1

                if out.item() == 1:
                    break

        return word_list

    def result(self, image):
        """
        The result function, which makes output from all models
        :param image: (Torch.Tensor) Input image
        :return: (str) Output Caption
        """
        image = image.to(self.device)
        features = self.encoder(image).unsqueeze(1)
        output = self.decoder_result(features)
        sentence = self.clean_sentence(output)
        return sentence

    def predict(self, image):
        image_t = self.preprocessing(image)
        caption = self.result(image_t)

        return caption
