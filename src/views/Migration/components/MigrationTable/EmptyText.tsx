// @ts-nocheck
// @ts-nocheck
import React from 'react'
import { Text } from '@nswap/uikit'

export interface EmptyTextProps {
  text: string
}

const EmptyText: React.FC<EmptyTextProps> = ({ text }) => {
  return (
    <Text padding="24px" fontSize="16px" textAlign="center">
      {text}
    </Text>
  )
}

export default EmptyText
