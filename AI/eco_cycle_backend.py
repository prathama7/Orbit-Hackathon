import openai

openai.api_key = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

def get_recycling_suggestion(item_description):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Provide recycling suggestions for the following item: {item_description}",
        max_tokens=100
    )
    return response.choices[0].text.strip()

def classify_recyclable_material(text):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Classify the following material as recyclable or non-recyclable: {text}",
        max_tokens=50
    )
    return response.choices[0].text.strip()

if __name__ == "__main__":
    item = "plastic bottle"
    suggestion = get_recycling_suggestion(item)
    print(f"Recycling suggestion for {item}: {suggestion}")
    
    material = "old newspaper"
    classification = classify_recyclable_material(material)
    print(f"The material {material} is: {classification}")
