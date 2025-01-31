from deepface import DeepFace
import os
import json

def analyze_emotion_from_image(image_path):
    """
    Analyze emotions from a single image using DeepFace.
    
    Args:
        image_path (str): Path to the image file.

    Returns:
        dict: A JSON-compatible dictionary containing the dominant emotion or error message.
    """
    try:
        # Analyze the image using DeepFace
        analysis = DeepFace.analyze(
            img_path=image_path,
            actions=["emotion"],  # Only analyze emotions
            enforce_detection=False
        )

        # Prepare the result based on the analysis output
        if isinstance(analysis, list):  # Multiple faces detected
            emotions = [{"dominant_emotion": face.get('dominant_emotion', 'N/A')} for face in analysis]
        else:  # Single face detected
            emotions = {"dominant_emotion": analysis.get('dominant_emotion', 'N/A')}
        print(analysis)
        return emotions[0]

    except Exception as e:
        return {"status": "error", "message": str(e)}


# Example Usage
if __name__ == "__main__":
    # Define the image path
    image_path = "/home/chirag/Desktop/landing_page/uploads/image_1737725300.png"  # Replace with your image path

    # Check if the image file exists
    if not os.path.exists(image_path):
        print(json.dumps({"status": "error", "message": "Image file not found"}))
    else:
        # Call the function and print the result
        result = analyze_emotion_from_image(image_path)
        print(json.dumps(result, indent=4))
