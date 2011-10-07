
// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // TextItem model
  //
  //
  TextItem = Backbone.Model.extend({
	
		defaults: {
				"text": ""
		}
	
  });
  
  // Create a collection of TextItems
  //
  //
  TextItemList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: TextItem,

    // Save all of the text items under the "TextItems" namespace.
    localStorage: new Store("TextItems")	
  });
  
  
  TextItems = new TextItemList();
  
  
  
  
  // This is the view for a single text item
  //
  //
  TextItemView = Backbone.View.extend({
	
	//... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#text-item-template').html()),
	
	// Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
	
	 // The TodoView listens for changes to its model, re-rendering.
    initialize: function() {
     
      this.model.bind('destroy', this.remove, this);
    },
	
	// Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },
	
	events: {
		"click a": "clear"
	},
	
	clear: function(){
		this.model.destroy();
	},
	
	remove: function(){
		$(this.el).remove();
	}
	
	
	
  });
  
  
  // The main application view
  //
  //
  AppView = Backbone.View.extend({
	
	el: $("#text-entry"),
	
	// Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #btnAdd": "createItem"
    },

    createItem: function(){
		
		// get the text 
		var text = $("#txtText").val();
		
		if(text){
			// create a new text item and add to the collection
			TextItems.create({text: text});
		}
		
		// remove the text and focus the input.
		$("#txtText").val("")
					.focus();
	},
	
	// At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting items that might be saved in *localStorage*.
    initialize: function() {
      
      TextItems.bind('add', this.addOne, this);
	  TextItems.bind('reset', this.addAll, this);
      TextItems.fetch();
    },
	
	addOne: function(textItem){
		var view = new TextItemView({model: textItem});
		$("#data-list").append(view.render().el);
	},
	
	addAll: function(textItem){
		TextItems.each(this.addOne);
	}
  });
  
  App = new AppView();
  
  
});
