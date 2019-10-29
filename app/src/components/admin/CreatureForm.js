import React, { Component } from "react"; 
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

class CreatureForm extends Component {
    state = {
        mode: 'create',
        editor: null,
    }

    componentDidMount() {
        if(this.props.creature) {
            this.setState({
                mode: 'edit'
            })
        }

        const submitBtn = document.querySelector('#submitNewCreature')
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            const editor = this.state.editor
            const mode = this.state.mode;
            console.table(editor, mode, this.props.creature)
        })
    }
    render() {
        const { title, creature } = this.props
        console.log(creature)
        return (
            <form action="" className="form -card">
                <h1>{title}</h1>
                <div className="form__group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="creature_name" id="name" defaultValue={creature ? creature.title.rendered : ""}/>
                </div>
                <div className="form__group">
                    <label htmlFor="description">Description</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onInit={ editor => {
                            this.setState({
                                editor: editor
                            })
                            if(creature) editor.setData(creature.content.rendered)
                        } }
                    />
                </div>
                <div className="form__group">
                    <button id="submitNewCreature">{title}</button>
                </div>
            </form>
        );
    }
}

export default CreatureForm;