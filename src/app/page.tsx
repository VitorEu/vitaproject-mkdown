'use client'

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { PreviewType } from '@uiw/react-md-editor';
import '../style/main.css'
import clientRequest from './requests/clientRequest';

const MarkdownEditor = dynamic(
	() => import('@uiw/react-md-editor'),
	{
		ssr: true
	}
);

interface IEditor {
	inheritedText: string,
	sessionId: string
}

export default function Editor(props: any) {

	const {
		inheritedText,
	} = props;

	const [content, setContent] = useState<string | undefined>(inheritedText);
	const [previewType, setPreviewType] = useState<PreviewType>('preview');
	const [oldContent, setOldContent] = useState<string | undefined>();

	useEffect(() => {
		const fetchData = async (uuid: string) => {
			const content = await clientRequest.getContentByUUID(uuid);
			setContent(content.text_content || undefined);
		}

		const searchParams = new URLSearchParams(window.location.search);
		const uuid = searchParams.get('uuid');

		if (uuid) fetchData(uuid);
	}, []);

	const isEditing = (): boolean => {
		return previewType === 'edit';
	}

	const startEditing = () => {
		setPreviewType('edit');
		setOldContent(content);
	}

	const saveContent = () => {
		setPreviewType('preview');
	}

	const cancelEdit = () => {
		setPreviewType('preview');
		setContent(oldContent);
	}

	return (
		<main style={{ display: 'inline-block' }}>
			<div style={{ display: 'flex', flexDirection: 'column', padding: 15 }}>
				<button
					style={{ backgroundColor: 'transparent', border: 0, padding: 0 }}
					onDoubleClick={() => startEditing()}>
					<MarkdownEditor
						className={isEditing() ? 'editor' : ''}
						style={{ width: '90vw' }}
						height={600}
						hideToolbar={!isEditing()}
						value={content}
						preview={previewType}
						onChange={(value) => {
							setContent(value)
						}} />
				</button>
			</div>
			{isEditing() &&
				<div style={{ display: 'flex', flexDirection: 'row', padding: 15 }}>
					<div style={{ width: '50vw' }}>
						<button
							className='button saveButton'
							type='submit'
							onClick={saveContent}>
							Salvar
						</button>
						<button
							className='button cancelButton'
							type='submit'
							onClick={cancelEdit}>
							Cancelar
						</button>
					</div>
				</div>
			}
		</main>
	)
}