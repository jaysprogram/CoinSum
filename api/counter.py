from ultralytics import YOLO
import cv2

def coinCounter(filename):
    # Load pre-trained YOLO11n model
    model = YOLO("./best.pt")
    image = cv2.imread(filename)
    results = model(image)
    coins = [0, 0, 0, 0]

    for result in results:
        for box in result.boxes:
            vertices = (box.xyxy).cpu().numpy()[0]
            x1, y1, x2, y2 = int(vertices[0]), int(vertices[1]), int(vertices[2]), int(vertices[3])
            cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(image, result.names[int(box.cls)], (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            coins[int(box.cls)] += 1

    return {'penny': coins[0], 'nickel': coins[1], 'dime': coins[2], 'quarter': coins[3]}