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
  return (
    <Box>
      <HStack spacing={4}>
        <IconButton aria-label={play ? 'Pause' : 'Play'}
                    onClick={() => { onPlayChange(true) }}
                    isDisabled={endTime === 0}
                    icon={<Icon as={play ? BsPause : BsPlay} />}
                    isRound
                    colorScheme="teal"
                    size="md" />

        <IconButton aria-label="Back"
                    onClick={() => {
                      play && onPlayChange()
                      onTimeChange(time - 1)
                    }}
                    disabled={endTime === 0 || time === 0}
                    icon={<Icon as={BsChevronLeft} />}
                    isRound
                    colorScheme="teal"
                    size="md" />

        <Slider colorScheme="teal"
                onChange={(value) => { onTimeChange(value) }}
                value={time}
                isDisabled={endTime === 0}
                defaultValue={0}
                min={0}
                max={endTime}
                focusThumbOnChange={false}
                varient="outline"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>

        <IconButton aria-label="Forward"
                    onClick={() => {
                      play && onPlayChange()
                      onTimeChange(time + 1)
                    }}
                    disabled={endTime === 0 || time === endTime}
                    icon={<Icon as={BsChevronRight} />}
                    isRound
                    colorScheme="teal"
                    size="md" />
      </HStack>
    </Box>
  )
}

export default ProgressControl
