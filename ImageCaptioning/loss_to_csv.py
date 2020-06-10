import re

with open('./training_log.txt', 'r') as t:
    s = t.read()

with open('./data.csv', 'w+') as f:
    f.write("train_loss, test_loss \n")
    for idx, x in enumerate(s.split('\n')):

        # epoch = re.findall("(?<=Epoch \[).*(?=\/\],)", x)[0]
        # batch = re.findall("(?<=, Step \[).*(?=\/1618\],)", x)[0]
        train_loss = re.findall("(?<=Loss: ).*(?=, Perplexity)",x)[0]
        test_loss = re.findall("(?<=, Valid Loss: ).*(?=)", x)[0]
        
        f.write(f"{train_loss}, {test_loss}\n")