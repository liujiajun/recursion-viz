import * as React from 'react'
import {
  Box,
  IconButton,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

type Props = {
  endTime: number,
  time: number
  onTimeChange: Function
}

const ProgressControl = ({ endTime, time, onTimeChange }: Props) => {
  return (
    <Box>
      <HStack spacing={4}>
        <IconButton aria-label="Back"
                    onClick={() => { onTimeChange(time - 1) }}
                    disabled={time === 0}
                    icon={<ArrowBackIcon />}
                    isRound={true}
                    colorScheme="teal"
                    size="xs" />
        <Slider colorScheme="teal"
                onChange={(value) => { onTimeChange(value) }}
                value={time}
                defaultValue={0}
                min={0}
                max={endTime}
                focusThumbOnChange={false} >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <IconButton aria-label="Forward"
                    onClick={() => { onTimeChange(time + 1) }}
                    disabled={time === endTime}
                    icon={<ArrowForwardIcon />}
                    isRound={true}
                    colorScheme="teal"
                    size="xs" />
      </HStack>
    </Box>
  )
}

export default ProgressControl
