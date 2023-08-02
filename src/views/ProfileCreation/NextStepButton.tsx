// @ts-nocheck
import { ArrowForwardIcon, Button, ButtonProps } from '@nswap/uikit'

const NextStepButton: React.FC<ButtonProps> = (props) => {
  return <Button endIcon={<ArrowForwardIcon color="currentColor" />} {...props} />
}

export default NextStepButton
