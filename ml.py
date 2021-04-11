import sys
sys.path.insert(0, "./sequence-labeler-master")

from complex_labeller import Complexity_labeller

model_path = "./cwi_seq.model"
temp_path = "./temp_file.txt"
model = Complexity_labeller(model_path, temp_path)

Complexity_labeller.convert_format_string(model, 'Based in an armoured train parked in its sidings, he met with numerous ministers')

dataframe = Complexity_labeller.get_dataframe(model)
print(dataframe)

print(list(zip(dataframe['sentences'].values[0],dataframe['labels'].values[0])))
