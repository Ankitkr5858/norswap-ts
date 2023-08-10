// @ts-nocheck
// @ts-nocheck
import { Colors, Heading, TextProps } from '@nswap/uikit'
import useTheme from 'hooks/useTheme'

interface HeadingProps extends TextProps {
  text: string
  lastColor?: keyof Colors
}

const ColoredWordLastHeading: React.FC<HeadingProps> = ({ text, lastColor, mb = '24px', ...props }) => {
  const { theme } = useTheme()
  const split = text.split(' ')
  const remainingWords = split.slice(0, split.length - 1).join(' ')
  const lastWord = split[split.length - 1]
  const displayedColor = (theme.colors[lastColor] as string) ?? theme.colors.secondary

  return (
    <Heading scale="xxl" mb={mb} {...props}>
      {remainingWords}
      <span style={{ color: '#ffffff' }}> {lastWord}</span>
    </Heading>
  )
}

export default ColoredWordLastHeading
