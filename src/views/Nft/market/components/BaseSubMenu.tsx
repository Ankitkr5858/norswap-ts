// @ts-nocheck
// @ts-nocheck
import { SubMenuItems } from '@nswap/uikit'
import styled from 'styled-components'

const BaseSubMenu = styled(SubMenuItems)`
  background-color: transparent;
  border-bottom: 1px ${({ theme }) => theme.colors.cardBorder} solid;
`

export default BaseSubMenu
