// @ts-nocheck
// @ts-nocheck
import styled from 'styled-components'
import { Flex, Skeleton, Td, useMatchBreakpointsContext } from '@nswap/uikit'

const GridItem = styled(Flex)`
  align-items: center;
`

const LoadingRow: React.FC = () => {
  const { isXs, isSm } = useMatchBreakpointsContext()

  return (
    <tr>
      <Td>
        <GridItem>
          <Skeleton height={[162, null, 64]} width={[80, null, 200]} />
        </GridItem>
      </Td>
      <Td>
        <GridItem justifyContent="flex-end">
          <Skeleton height={[66, null, 24]} width={64} />
        </GridItem>
      </Td>
      {isXs || isSm ? null : (
        <>
          <Td>
            <GridItem justifyContent="flex-end">
              <Skeleton height={42} width={64} />
            </GridItem>
          </Td>
          <Td>
            <GridItem justifyContent="flex-end">
              <Skeleton height={48} width={124} />
            </GridItem>
          </Td>
        </>
      )}
      <Td>
        <GridItem justifyContent="center">
          <Skeleton height={[36, null, 24]} width={[80, null, 120]} />
        </GridItem>
      </Td>
    </tr>
  )
}

const TableLoader: React.FC = () => (
  <>
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
  </>
)

export default TableLoader
