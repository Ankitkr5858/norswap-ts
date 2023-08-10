// @ts-nocheck
// @ts-nocheck
import { Flex, Text } from '@nswap/uikit'
import { ReactElement } from 'react-markdown'

interface TextIconProps {
  text: string
  bold?: boolean
  icon: ReactElement
}

const TextIcon: React.FC<TextIconProps> = ({ icon, text, bold = false }) => {
  return (
    <Flex alignItems="center">
      <Text color="text" mr="8px" bold={bold} textTransform="uppercase">
        {text}
      </Text>
      {icon}
    </Flex>
  )
}

export default TextIcon
