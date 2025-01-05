"use client";

import Canvas, { CanvasRef } from "@/components/neural-network-sim/Canvas";
import { imageToNNInput, runMnistModel } from "@/lib/ai/mnistHelper";
import { NN_CANVAS_LENGTH } from "@/lib/constants";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

type DigitResult = {
  digit: number;
  probability: number;
};

const NeuralNetSim = () => {
  const canvasRef = useRef<CanvasRef | null>(null);
  const [digitProbs, setDigitProbs] = useState<DigitResult[]>(
    Array.from({ length: 10 }, (_, i) => ({ digit: i, probability: 0 }))
  );

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.reset();
      setDigitProbs(
        Array.from({ length: 10 }, (_, i) => ({ digit: i, probability: 0 }))
      );
    }
  };

  const handleRun = () => {
    if (!canvasRef.current) return;

    const image = canvasRef.current.getImage();
    if (!image) return;

    const nnInput = imageToNNInput(image);
    runMnistModel(nnInput).then((result) => {
      setDigitProbs(
        result.map((probability, digit) => ({
          digit,
          probability: Math.round(probability * 100 * 100) / 100,
        }))
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h3 className="text-2xl font-bold">MNIST Digit Recogniser</h3>
      <p className="text-muted-foreground">
        Draw a digit and have a neural network guess it!
      </p>
      <div className="flex flex-row">
        <div className="relative">
          <Canvas
            width={NN_CANVAS_LENGTH}
            height={NN_CANVAS_LENGTH}
            handleRun={handleRun}
            ref={canvasRef}
          />
          <button
            className="absolute top-2 left-2 text-muted-foreground hover:text-secondary-foreground"
            onClick={handleClear}
          >
            <RotateCcw size={18} />
          </button>
        </div>
        <BarChart
          accessibilityLayer
          layout="vertical"
          data={digitProbs}
          width={400}
          height={280}
          margin={{ right: 60, left: -20 }}
        >
          <XAxis dataKey="probability" type="number" hide />
          <YAxis
            dataKey="digit"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <Bar
            dataKey="probability"
            fill="blue"
            radius={5}
            label={{
              position: "right",
              formatter: (value: number) => `${value}%`,
              fontSize: 10,
            }}
          />
        </BarChart>
      </div>
      <p className="text-muted-foreground">
        <Link
          href="https://github.com/onnx/models/tree/main/validated/vision/classification/mnist"
          className="underline"
        >
          MNIST model
        </Link>{" "}
        running in your browser in real time, powered by{" "}
        <Link
          href="https://onnxruntime.ai/docs/get-started/with-javascript/web.html"
          className="underline"
        >
          ONNX Runtime Web
        </Link>
        .
      </p>
    </div>
  );
};

export default NeuralNetSim;
