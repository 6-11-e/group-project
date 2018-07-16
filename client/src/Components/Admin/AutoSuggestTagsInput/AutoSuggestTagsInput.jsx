import React from 'react';
import Autosuggest from 'react-autosuggest';
import TagsInput from 'react-tagsinput';
import {Badge} from 'reactstrap';
import './style.css';

export default class AutoSuggestTagsInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            suggestions: [],
            tags: []
        }
        this.state.suggestions = this.props.suggestions;
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.validateTag = this.validateTag.bind(this);
    }
    handleChange(tags){
        console.log(tags)
        this.setState({tags})
    }

    renderTag(props){
        let {tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other} = props;
        return(
            <Badge key={key} color="secondary" style={{padding: '10px', margin: '5px', fontSize: '1em', width: '100%', textAlign: 'left'}}>
                {getTagDisplayValue(tag)}&nbsp;&nbsp;&nbsp;
                {!disabled && <a style={{cursor: "pointer", float: 'right'}}className={classNameRemove} onClick={(e) => onRemove(key)}>x</a>}
            </Badge>
        )
    }

    validateTag(tag){
        console.log('Tag', tag)
        return false;
    }

    handleChangeInput(tag){
        this.setState({tag})
    }
    renderLayout(tagComp, inputComp){
        return(
            <div>
                {inputComp}
                {tagComp} 
            </div>
            
        )
    }
    
    render() {
        const suggestionsArray = this.state.suggestions;
        function autocompleteRenderInput({addTag, ...props}) {
            const handleOnChange = (e, {newValue, method}) => {
                if (method === 'enter'){
                    e.preventDefault()
                } else {
                    props.onChange(e)
                }
            }
            
            const inputValue = (props.value && props.value.trim().toLowerCase()) || '';
            const inputLength = inputValue.length;

            let suggestions = suggestionsArray.filter((suggest) => {
                return suggest.name.toLowerCase().slice(0, inputLength) === inputValue
            })
            // renderSuggestion = (suggestion, {query, isHighlighted}) =>{
            //     console.log(isHighlighted)
            //     return(
            //         <li>{suggestion.name}</li>
            //     )
            // }
            let theme = {
                container: 'asContainer',
                containerOpen: 'asContainerOpen',
                input: 'asInput',
                inputOpen: 'asInputOpen',
                inputFocused: 'asInputFocused',
                suggestionsContainer: 'asSuggestionsContainer',
                suggestionsContainerOpen: 'asSuggestionsContainerOpen',
                suggestionsList: 'asSuggestionsList',
                suggestion: 'asSuggestion',
                suggestionFirst: 'asSuggestionFirst',
                suggestionHighlighted: 'asSuggestionHighlighted',
                sectionContainer: 'asSectionContainer',
                sectionContainerFirst: 'asSectionContainerFirst',
                sectionTitle: 'asSectionTitle'
            }
            return(
                <Autosuggest
                    ref={props.ref}
                    suggestions={suggestions}
                    shouldRenderSuggestions={(value) => value && value.trim().length > 0}
                    getSuggestionValue={(suggestion) => suggestion._id}
                    renderSuggestion={(suggestion, {query, isHighlighted}) => {return(<span>{suggestion.name}</span>)}}
                    inputProps={{...props, onChange: handleOnChange}}
                    onSuggestionSelected={(e, {suggestion}) => {
                        addTag(suggestion.name)
                    }}
                    onSuggestionsClearRequested={() => {}}
                    onSuggestionsFetchRequested={() => {}}
                    theme={theme}
                />
            )
        }
        return(
            <TagsInput
                renderInput={autocompleteRenderInput}
                value={this.state.tags}
                onChange={this.handleChange}
                inputProps={this.props.inputProps}
                renderTag={this.renderTag}
                onlyUnique={true}
                validate={this.validateTag}
                renderLayout={this.renderLayout}
                inputValue={this.state.tag}
                onChangInput={this.handleChangeInput}
            />
        )
    }
}