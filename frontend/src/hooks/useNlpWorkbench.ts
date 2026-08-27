import { useState } from 'react'
import { NlpService, type AnalysisResult } from '@/services/nlpService'

export function useNlpWorkbench() {
  const [inputText, setInputText] = useState('')
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.85)
  const [modelVersion, setModelVersion] = useState('distilbert-bio-v2.4.1')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const analyze = async (customNote?: string) => {
    const textToAnalyze = customNote || inputText
    if (!textToAnalyze.trim()) return

    setIsAnalyzing(true)
    try {
      const res = await NlpService.analyzeClinicalNote({
        rawClinicalNote: textToAnalyze,
        modelVersion,
        confidenceThreshold,
      })
      setResult(res)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clear = () => {
    setInputText('')
    setResult(null)
  }

  return {
    inputText,
    setInputText,
    confidenceThreshold,
    setConfidenceThreshold,
    modelVersion,
    setModelVersion,
    isAnalyzing,
    result,
    analyze,
    clear,
  }
}
