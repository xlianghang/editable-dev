import * as React from 'react'
import { createEditor, Descendant } from '@editablejs/models'
import { EditableProvider, ContentEditable, withEditable } from '@editablejs/editor'
// import { withPlugins } from '@editablejs/plugins'

const App = () => {

  const editor = React.useMemo(() => {
    const editor = withEditable(createEditor());
    // return withPlugins(editor);
    return editor;
  }, [])


  function handleChange(value: Descendant[]) {
    console.log('handleChange', value);
  }

  return (
    <EditableProvider editor={editor} onChange={handleChange}>
      <ContentEditable placeholder="Please enter content..." />
    </EditableProvider>)
}

export default App;
