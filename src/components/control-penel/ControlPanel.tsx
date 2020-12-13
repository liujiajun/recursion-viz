import React from 'react'
import {
  Box,
  IconButton,
  Select,
  Switch,
  Flex,
  Spacer,
  Input,
  Icon,
  FormControl,
  FormLabel
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
    <FormControl height="100%">
      <Flex height="100%"
            p={3}
            direction="column"
            overflowY="auto">
        <Select value={selectedTemplate}
                onChange={e => changeTemplate(e.target.value)}
                colorScheme="teal"
                focusBorderColor="teal.500"
                variant="outline"
        >
          { Object.entries(templates).map(([k, v]) =>
            <option key={k} value={k}> { v.name } </option>
          ) }
        </Select>

        <Box mt={3}>
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

        <Flex alignItems="center" mt={3}>
          <FormLabel htmlFor="enable-memo" mb="0">Enable memo?</FormLabel>
          <Switch id="enable-memo"
                  colorScheme="teal"
                  size="md"
                  isChecked={enableMemo}
                  onChange={e => setEnableMemo(e.target.checked)}
          />
        </Flex>

        <Spacer />

        <Box mt={3}>
          <Flex direction="row" align="center">
            <Input value={call}
                   onChange={e => setCall(e.target.value)}
                   size="md" focusBorderColor="teal.500" mr={2} />
            <IconButton
              aria-label="Run"
              onClick={() => validateAndSubmit()}
              icon={<Icon as={VscDebugStart} />}
              colorScheme="teal"
              isRound
              size="md">
              Run
            </IconButton>
          </Flex>
        </Box>
      </Flex>
    </FormControl>
  )
}

export default ControlPanel
