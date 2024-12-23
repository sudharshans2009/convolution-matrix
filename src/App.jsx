import { useState } from "react";
import "./App.css";

const MatrixConvolution = () => {
  const [matrixSize, setMatrixSize] = useState(0); // Default matrix size
  const [kernelSize, setKernelSize] = useState(0); // Default kernel size
  const [matrix, setMatrix] = useState([]);
  const [kernel, setKernel] = useState([]);
  const [result, setResult] = useState([]);

  const initializeMatrix = (size) =>
    Array.from({ length: size }, () => Array(size).fill(0));

  const handleMatrixChange = (value, row, col, isKernel) => {
    const updatedMatrix = isKernel ? [...kernel] : [...matrix];
    updatedMatrix[row][col] = Number(value);
    if (isKernel) {
      setKernel(updatedMatrix);
    } else {
      setMatrix(updatedMatrix);
    }
  };

  const convolve = () => {
    const mRows = matrix.length;
    const mCols = matrix[0].length;
    const kRows = kernel.length;
    const kCols = kernel[0].length;

    const outputRows = mRows - kRows + 1;
    const outputCols = mCols - kCols + 1;
    const output = Array.from({ length: outputRows }, () =>
      Array(outputCols).fill(0)
    );

    for (let i = 0; i < outputRows; i++) {
      for (let j = 0; j < outputCols; j++) {
        let sum = 0;
        for (let ki = 0; ki < kRows; ki++) {
          for (let kj = 0; kj < kCols; kj++) {
            sum += matrix[i + ki][j + kj] * kernel[ki][kj];
          }
        }
        output[i][j] = sum;
      }
    }

    setResult(output);
  };

  return (
    <div className="container">
      <h2>Matrix Convolution Calculator</h2>
      <div style={{ marginBottom: "20px" }}>
        <h3>Set Matrix Size</h3>
        <input
          type="number"
          value={matrixSize}
          onChange={(e) => {
            const size = Number(e.target.value);
            setMatrixSize(size);
            setMatrix(initializeMatrix(size));
          }}
          min="1"
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Set Kernel Size</h3>
        <input
          type="number"
          value={kernelSize}
          onChange={(e) => {
            const size = Number(e.target.value);
            setKernelSize(size);
            setKernel(initializeMatrix(size));
          }}
          min="1"
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Input Larger Matrix</h3>
        {matrix.map((row, i) => (
          <div key={i} style={{ display: "flex", marginBottom: "5px" }}>
            {row.map((cell, j) => (
              <input
                key={j}
                type="number"
                // value={cell}
                onChange={(e) =>
                  handleMatrixChange(e.target.value, i, j, false)
                }
                style={{ width: "100px", marginRight: "5px" }}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Input Kernel</h3>
        {kernel.map((row, i) => (
          <div key={i} style={{ display: "flex", marginBottom: "5px" }}>
            {row.map((cell, j) => (
              <input
                key={j}
                type="number"
                // value={cell}
                onChange={(e) => handleMatrixChange(e.target.value, i, j, true)}
                style={{ width: "100px", marginRight: "5px" }}
              />
            ))}
          </div>
        ))}
      </div>

      <button onClick={convolve} style={{ marginBottom: "20px" }}>
        Perform Convolution
      </button>

      {result.length > 0 && (
        <div>
          <h3>Convolution Result</h3>
          {result.map((row, i) => (
            <div key={i} style={{ display: "flex", marginBottom: "5px" }}>
              {row.map((cell, j) => (
                <input
                  key={j}
                  type="number"
                  value={cell}
                  disabled
                  style={{ width: "100px", marginRight: "5px" }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="credits">
        <p>
          Made by <a href="https://github.com/sudharshans2009">Sudharshan S</a>
        </p>
      </div>
    </div>
  );
};

export default MatrixConvolution;
