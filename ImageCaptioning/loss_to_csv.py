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

import re

with open('./training_log.txt', 'r') as t:
    s = t.read()

with open('./data.csv', 'w+') as f:
    f.write("epoch, train_loss, test_loss \n")
    for idx, x in enumerate(s.split('\n')):

        epoch = re.findall("(?<=Epoch \[).*(?=\/5\],)", x)[0]
        batch = re.findall("(?<=, Step \[).*(?=\/3236\],)", x)[0]
        train_loss = re.findall("(?<=Loss: ).*(?=, Perplexity)",x)[0]
        test_loss = re.findall("(?<=, Valid Loss: ).*(?=)", x)[0]
        
        f.write(f"{epoch}, {train_loss}, {test_loss}\n")