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
  autoPlay: boolean,
  onTimeChange: Function,
  onAutoPlayChange: Function
}

const ProgressControl = ({ endTime, time, autoPlay, onTimeChange, onAutoPlayChange }: Props) => {
  return (
    <Box>
      <HStack spacing={4}>
        <IconButton aria-label={autoPlay ? 'Pause' : 'Play'}
                    onClick={() => { onAutoPlayChange(true) }}
                    icon={<Icon as={autoPlay ? BsPause : BsPlay} />}
                    isRound={true}
                    colorScheme="teal"
                    size="xs" />

        <IconButton aria-label="Back"
                    onClick={() => { onTimeChange(time - 1) }}
                    disabled={time === 0}
                    icon={<Icon as={BsChevronLeft} />}
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
                    icon={<Icon as={BsChevronRight} />}
                    isRound={true}
                    colorScheme="teal"
                    size="xs" />
      </HStack>
    </Box>
  )
}

export default ProgressControl
