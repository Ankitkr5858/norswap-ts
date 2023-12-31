// @ts-nocheck
// @ts-nocheck
import React from 'react'
import { Text, CardHeader } from '@nswap/uikit'

export interface TableHeaderProps {
  title: string
}

const TableHeader: React.FC<TableHeaderProps> = ({ title }) => {
  return (
    <CardHeader>
      <Text fontSize="20px" bold>
        {title}
      </Text>
    </CardHeader>
  )
}

export default TableHeader
