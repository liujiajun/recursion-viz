import React from 'react'
import {
  Box,
  IconButton,
  Select,
  Switch,
  Flex,
  Spacer,
  Text,
  Input,
  Icon
} from '@chakra-ui/react'
import { VscDebugStart } from 'react-icons/vsc'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'
import templates from '../../data/Templates'
import { toCodeAndCall, toFunctionContent } from '../tree-viewer/Utils'

type Props = {
  onSubmit: Function
}

const ControlPanel = ({ onSubmit } : Props) => {
  const [selectedTemplate, setSelectedTemplate] = React.useState('')
  const [code, setCode] = React.useState('')
  const [enableMemo, setEnableMemo] = React.useState(false)
  const [call, setCall] = React.useState('')

  const changeTemplate = (id: string) => {
    const [code, call] = toCodeAndCall(templates[id].fnContent)

    setSelectedTemplate(id)
    setCode(code)
    setEnableMemo(templates[id].fnContent.enableMemo)
    setCall(call)
  }

  const validateAndSubmit = () => {
    onSubmit(toFunctionContent(code, call, enableMemo))
  }

  React.useEffect(() => {
    changeTemplate('custom')
  }, [])

  return (
    <Flex direction="column" height="100%" overflowY="auto">
      <Box width="100%">
        <Select value={selectedTemplate}
                onChange={e => changeTemplate(e.target.value)}
                colorScheme="teal"
                focusBorderColor="teal.500"
                variant="outline">
          { Object.entries(templates).map(([k, v]) =>
            <option key={k} value={k}> { v.name } </option>
          ) }
        </Select>
      </Box>
      <Box width="100%" mt={3}>
        <Editor
          value={code}
          onValueChange={value => setCode(value)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: '#fafafa',
            borderRadius: 4
          }}
        />
      </Box>
      <Box width="100%" mt={3} mb={3}>
        <Flex align="center">
          <Text mr={3}>Enable memo?</Text>
          <Switch colorScheme="teal"
                  size="md"
                  isChecked={enableMemo}
                  onChange={e => setEnableMemo(e.target.checked)}
          />
        </Flex>
      </Box>
      <Spacer />
      <Box width="100%" mb={3}>
        <Flex direction="row" align="center" mr="0.2rem">
          <Input value={call}
                 onChange={e => setCall(e.target.value)}
                 size="sm" focusBorderColor="teal.500" mr={2} />
          <IconButton
            aria-label="Run"
            onClick={() => validateAndSubmit()}
            icon={<Icon as={VscDebugStart} />}
            colorScheme="teal"
            isRound
            size="sm">
            Run
          </IconButton>
        </Flex>
      </Box>
    </Flex>
  )
}

export default ControlPanel
