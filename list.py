import os

folder = './img/photos'  # Path to your image folder
output_file = 'photo list.js'
image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.webp')

# Get image filenames
files = [f for f in os.listdir(folder) if f.lower().endswith(image_extensions)]

# Write them to a JS file
with open(output_file, 'w') as f:
    f.write('const photoList = [\n')
    for filename in files:
        f.write(f"  '{folder}/{filename}',\n")
    f.write('];\n')