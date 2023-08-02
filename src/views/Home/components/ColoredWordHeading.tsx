// @ts-nocheck
import { Colors, Heading, TextProps } from '@nswap/uikit'
import useTheme from 'hooks/useTheme'

interface HeadingProps extends TextProps {
  text: string
  firstColor?: keyof Colors
}

const ColoredWordHeading: React.FC<HeadingProps> = ({ text, firstColor, mb = '24px', ...props }) => {
  const { theme } = useTheme()
  const split = text.split(' ')
  const firstWord = split[0]
  const remainingWords = split.slice(1).join(' ')
  const displayedColor = (theme.colors[firstColor] as string) ?? theme.colors.secondary

  return (
    <Heading scale="xl" mb={mb} {...props}>
      {firstWord}
      <span style={{ color: '#029BE0' }}> {remainingWords}</span>
      
    </Heading>
  )
}

export default ColoredWordHeading
