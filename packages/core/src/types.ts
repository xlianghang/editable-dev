import type { IModel, INode, NodeData, NodeKey, Op } from '@editablejs/model'
import type { IRange, ISelection } from '@editablejs/selection';
import type { IEventEmitter } from '@editablejs/event-emitter';
import type { ITyping } from './typing/types';

export interface RenderOptions<E extends NodeData = NodeData, T extends INode<E> = INode<E>> {
  node: T
  next: (node: INode) => any
  editor: IEditor
}

export type PluginRender <E extends NodeData = NodeData, T extends INode<E> = INode<E>> = (options: RenderOptions<E, T>) => any

export interface PluginOptions<E extends NodeData = NodeData, T extends INode<E> = INode<E>> {
  render: PluginRender<E, T>
  isBlock?: (node: INode) => boolean
  isInline?: (node: INode) => boolean
  isVoid?: (node: INode) => boolean
}

export interface EditorOptions {
  enabledPlugins?: string[]
  disabledPlugins?: string[]
}

export type CompositionUpdateCallback = (data: { chars: Record<'type' | 'text', string>[], text: string, offset: number } | null) => void

export type NodeUpdateCallback<E extends NodeData = NodeData, T extends INode<E> = INode<E>> = (node: T, ops: Op[]) => void

export interface IEditor extends IEventEmitter {

  readonly isComposition: boolean

  model: IModel

  selection: ISelection

  typing: ITyping

  change: IChange
  
  registerPlugin<E extends NodeData = NodeData, T extends INode<E> = INode<E>>(type: string, options: PluginOptions<E, T> | PluginRender<E, T>): void;

  renderPlugin<E extends NodeData = NodeData, T extends INode<E> = INode<E>>(node: T): any

  onUpdate<E extends NodeData = NodeData, T extends INode<E> = INode<E>>(key: NodeKey, callback: NodeUpdateCallback<E, T>): void

  offUpdate(key: NodeKey): void

  onCompositionUpdate(key: NodeKey, callback: CompositionUpdateCallback): void

  offCompositionUpdate(key: NodeKey): void

  didCompositionUpdate(textNode: globalThis.Text): void

  destroy(): void
}

export interface IChange {

  getRange(): IRange | null

  getCurentState(): IState

  deleteBackward(): void

  deleteForward(): void

  deleteContents(): void

  insertText(text: string): void;

  insertNode(node: INode): void

  hasCacheFormatting(): boolean

  setFormat(name: string, value: string | number): void

  deleteFormat(name: string): void
}

export interface IState {
  types: string[]
  format: Map<string, (string | number)[]>
  style: Map<string, (string | number)[]>
  keys: string[]
  nodes: INode[]
}