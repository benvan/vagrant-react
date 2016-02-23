require('./index.css')
require('./components.js')


const labelled = (child) => React.createElement('div', {},
  React.createElement('label', {htmlFor:child.props.name}, child.props.name),
  child
);




class ContactView extends React.Component {
  static propTypes = {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onContactChange: React.PropTypes.func,
    onContactSubmit: React.PropTypes.func,
  };

  render() {
    const listElements = this.props.contacts
      .filter( (contact) => contact.email )
      .map( (contact) => React.createElement(ContactItem, contact) )

    return (
      <div className="ContactView">
        <h1 className="ContactView-title">Contacts</h1>
        <ul className="ContactView-list">
          {listElements}
        </ul>
        <ContactForm
          value={this.props.newContact}
          onChange={this.props.onContactChange}
          onSubmit={this.props.onContactSubmit}
        ></ContactForm>
      </div>
    )
  }
}


const ContactForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },

  updateValue(name){
    return (ev) => {
      var c = {[name]:ev.target.value};
      this.props.onChange(Object.assign({},this.props.value,c));
    }
  },

  submit(ev){
    ev.preventDefault();
    this.props.onSubmit(this.props.value);
    return false;
  },



  componentDidUpdate(){
    const errorkeys = Object.keys(this.props.value.errors || {});
    if (errorkeys.length && this.isMounted){
      this.refs[errorkeys[0]].focus();
    }

    if (this.props.value == empties.contact){
      this.refs.email.focus();
    }
  },

  render: function(){
    var component = this;
    var value = this.props.value;
    var errors = this.props.value.errors || {};
    return React.createElement('form',{className: 'ContactForm', onSubmit:this.submit},
      labelled(React.createElement('input', {
        name:'name',
        ref: 'name',
        className: errors.name && 'error',
        value:value.name,
        onChange:this.updateValue('name')
      })),
      labelled(React.createElement('input', {
        name:'email',
        ref: 'email',
        className: errors.email && 'error',
        value:value.email,
        onChange:this.updateValue('email')
      })),
      labelled(React.createElement('textarea', {
        name:'description',
        value:value.description,
        onChange:this.updateValue('description')
      })),
      React.createElement('button', {type:'submit'}, 'Add Contact')
    )
  }
});

var ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },

  render: function() {
    return (
      React.createElement('li', {className: 'ContactItem'},
        React.createElement('h2', {className: 'ContactItem-name'}, this.props.name),
        React.createElement('a', {className: 'ContactItem-email', href: 'mailto:'+this.props.email}, this.props.email),
        React.createElement('div', {className: 'ContactItem-description'}, this.props.description)
      )
    )
  },
});


var empties = {
  contact:{name:'', email:'', description:''}
};
var state = {};
var actions = {
  submitNewContact: function(contact){
    var result = Object.assign({},contact,{errors:{}});
    if (!contact.name) result.errors.name = "No name";
    if (!contact.email) result.errors.email = "No email";
    else if (contact.email.indexOf('@') == -1) result.errors.email = 'Not an email';

    setState(
      (!Object.keys(result.errors).length) ? {
        contact:empties.contact,
        contacts:state.contacts.concat(Object.assign({},contact,{key:state.contacts.length}))
      } : {
        contact: result
      }
    );
  }
}

var setState = function(update){
  state = Object.assign({},state,update);
  render();
}

var render = function(){

  var rootElement = React.createElement(ContactView, {
    contacts:state.contacts,
    newContact:state.contact,
    onContactChange: function(contact){
      console.log('foo!')
      setState({contact:contact});
    },
    onContactSubmit:actions.submitNewContact
  });


  ReactDOM.render(rootElement, document.getElementById('react-app'))
}

setState({
  contact:empties.contact,
  contacts: [
      {key: 0, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
      {key: 1, name: "Jim", email: "jim@example.com"},
      {key: 2, name: "Joe"},
  ]
})
