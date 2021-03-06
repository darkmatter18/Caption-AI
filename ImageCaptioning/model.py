#  Copyright 2020 Arkadip Bhattacharya
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

import torch
import torch.nn as nn
import torchvision.models as models

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#device = torch.device("cpu")

class EncoderCNN(nn.Module):
    def __init__(self, embed_size):
        super(EncoderCNN, self).__init__()
        resnet = models.resnet50(pretrained=True)
        for param in resnet.parameters():
            param.requires_grad_(False)
        
        modules = list(resnet.children())[:-1]
        self.resnet = nn.Sequential(*modules)
        self.embed = nn.Linear(resnet.fc.in_features, embed_size)

    def forward(self, images):
        features = self.resnet(images)
        features = features.view(features.size(0), -1)
        features = self.embed(features)
        return features
    

class DecoderRNN(nn.Module):
    def __init__(self, embed_size, hidden_size, vocab_size, num_layers=1, drop=0.5):
        super(DecoderRNN, self).__init__()
        
        # Set the hidden size for init_hidden
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        # Set the device
        self.device = device
        
        # Embedded layer
        self.embed = nn.Embedding(vocab_size, embed_size)
        
        # LSTM layer
        self.lstm = nn.LSTM(input_size=embed_size,
                            hidden_size=hidden_size,
                            num_layers=num_layers,
                            batch_first= True,
                            dropout = drop)
        
        # Dropout Layer
        self.drop = nn.Dropout(p=drop)
        
        # Fully Connected layer
        self.fc = nn.Linear(hidden_size, vocab_size)
        
    def init_hidden(self, batch_size):
        return (torch.zeros(self.num_layers, batch_size, self.hidden_size, device = device),
                torch.zeros(self.num_layers, batch_size, self.hidden_size, device = device))
    
    def forward(self, features, hidden):
        
        # LSTM
        lstm_out, hidden = self.lstm(features, hidden)
        # Functional component
        out = self.fc(lstm_out)
        
        out = out.squeeze(1)
        out = out.argmax(dim=1)
        
        features = self.embed(out.unsqueeze(0))
        
#         # Embedding the captions
#         embedded = self.embed(captions)
#         # print(embedded.shape)
#         # print(features.unsqueeze(1).shape)
#         # print(embedded.shape)
#         embedded = torch.cat((features.unsqueeze(1), embedded), dim=1)

#         # LSTM
#         lstm_out, hidden = self.lstm(features, hidden)
        
#         # Functional component
#         out = self.fc(lstm_out)
        return out, features, hidden

    def sample(self, inputs, states=None, max_len=20):
        " accepts pre-processed image tensor (inputs) and returns predicted sentence (list of tensor ids of length max_len) "
        
        # Initialize the hidden state
        hidden = self.init_hidden(inputs.shape[0])# features is of shape (batch_size, embed_size)
        
        out_list = list()
        word_len = 0
        
        with torch.no_grad():
            while word_len < max_len:
                lstm_out, hidden = self.lstm(inputs, hidden)
                out = self.fc(lstm_out)
                #print(out.shape)
                out = out.squeeze(1)
                out = out.argmax(dim=1)
                out_list.append(out.item())
                
                inputs = self.embed(out.unsqueeze(0))
                
                word_len += 1
                if out == 1:
                    break
        
        return out_list