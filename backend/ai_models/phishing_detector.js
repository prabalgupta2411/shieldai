const ort = require('onnxruntime-node');
const path = require('path');

class PhishingDetector {
  constructor() {
    this.model = null;
    this.session = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Load the ONNX model
      const modelPath = path.join(__dirname, 'model.onnx');
      this.session = await ort.InferenceSession.create(modelPath);
      this.initialized = true;
      console.log('Phishing detection model initialized successfully');
    } catch (error) {
      console.error('Error initializing phishing detection model:', error);
      throw error;
    }
  }

  async detectPhishing(url) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Create input tensor
      const inputTensor = new ort.Tensor('string', [url], [1]);
      
      // Run inference with properly formatted input
      const results = await this.session.run({
        inputs: inputTensor
      });
      
      // Get probability from results
      const probabilities = results['probabilities'].data;
      const probability = probabilities[1]; // Probability of being phishing
      
      return {
        isPhishing: probability > 0.5,
        probability: probability,
        confidence: Math.abs(probability - 0.5) * 2 // Convert to confidence score
      };
    } catch (error) {
      console.error('Error during phishing detection:', error);
      throw error;
    }
  }
}

module.exports = new PhishingDetector(); 