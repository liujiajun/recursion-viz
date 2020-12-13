import * as React from 'react'
import {
  Box,
  IconButton,
  Icon,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from '@chakra-ui/react'
import { BsChevronLeft, BsChevronRight, BsPause, BsPlay } from 'react-icons/bs'

type Props = {
  endTime: number,
  time: number,
  play: boolean,
  onTimeChange: Function,
  onPlayChange: Function
}

const ProgressControl = ({ endTime, time, play, onTimeChange, onPlayChange }: Props) => {
  console.log(time)
  console.log(endTime)
  return (
    <Box>
      <HStack spacing={4}>
        <IconButton aria-label={play ? 'Pause' : 'Play'}
                    onClick={() => { onPlayChange(true) }}
                    isDisabled={endTime === 0}
                    icon={<Icon as={play ? BsPause : BsPlay} />}
                    isRound
                    colorScheme="teal"
                    size="xs" />

        <IconButton aria-label="Back"
                    onClick={() => { onTimeChange(time - 1) }}
                    disabled={time === 0}
                    icon={<Icon as={BsChevronLeft} />}
                    isRound
                    colorScheme="teal"
                    size="xs" />

        <Slider colorScheme="teal"
                onChange={(value) => { onTimeChange(value) }}
                value={time}
                isDisabled={endTime === 0}
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
                    icon={<Icon as={BsChevronRight} />}
                    isRound
                    colorScheme="teal"
                    size="xs" />
      </HStack>
    </Box>
  )
}

export default ProgressControl
