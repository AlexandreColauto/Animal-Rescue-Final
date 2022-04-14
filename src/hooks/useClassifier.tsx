import React from 'react'
import { useMoralis } from 'react-moralis'

function useClassifier() {
  const { Moralis, web3, isAuthenticated, authenticate } = useMoralis()

  const isEOA = async (address: string) => {
    if (address.length != 42) return
    const web3Provider = web3
    try {
      const code = await web3Provider?.getCode(address)
      if (code?.length ? code.length > 4 : false) {
        return 'contract'
      } else {
        return 'userwallet'
      }
    } catch (e) {
      console.log(e)
      if (!isAuthenticated) authenticate()
      return 'invalid'
    }
  }
  return isEOA
}

export default useClassifier
