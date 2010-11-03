/**
 *  Creole Language Definition
 *
 */
(function() {

var Creole = {
  
  'function-bold' :         {
                              search: /([^\n]+)([\n]*)/gi,
                              replace: "**$1**$2"
                            },
  
  'function-italic' :       {
                              search: /([^\n]+)([\n]*)/gi,
                              replace: "//$1//$2"
                            },
  
  'function-code'   :       {
                              search: /([^\n]+)([\n]*)/gi,
                              replace: "{{{$1}}}$2"
                            },
                            
  'function-hr'     :       {
                              append: "\n\n----\n\n";
                            },
  
  'function-ul'     :       { 
                              search: /(.+)([\n]?)/gi,
                              replace: "* $1$2"
                            },
  
  /* This looks silly but is completely valid Markdown */                     
  'function-ol'   :         {
                              search: /(.+)([\n]?)/gi,
                              replace: "# $1$2"
                            },
                            
  'function-link'       :   {
                              exec: function( txt, selText, $field ) {
                                var results = null;
                                $.GollumEditor.Dialog({
                                  title: 'Insert Link',
                                  fields: [
                                    {
                                      id:   'text',
                                      name: 'Link Text',
                                      type: 'text',
                                      help: 'The text to display to the user.'
                                    },
                                    {
                                      id:   'href',
                                      name: 'URL',
                                      type: 'text',
                                      help: 'The URL to link to.'
                                    }
                                  ],
                                  OK: function( res ) {
                                   if ( res['text'] && res['href'] ) {
                                      return '[[' + res['href'] + '|' + 
                                             res['text'] + ']]';
                                    }
                                    else
                                      return '';
                                  }
                                });
                                
                               
                              }
                            },
                     
  'function-image'      :   {
                              exec: function( txt, selText, $field ) {
                                var results = null;
                                $.GollumEditor.Dialog.init({
                                  title: 'Insert Image',
                                  fields: [
                                    {
                                      id: 'url',
                                      name: 'Image URL',
                                      type: 'text'
                                    },
                                    {
                                      id: 'alt',
                                      name: 'Alt Text',
                                      type: 'text'
                                    }
                                  ],
                                  OK: function( res ) {
                                    if ( res['url'] && res['alt'] ) {
                                      var h = '{{' + res['url'];
                                      if ( res['alt'] != '' ) {
                                        h += '|' + res['alt'] + '}}';
                                      }
                                      return h;
                                    } else
                                      return '';
                                  }
                                });
                              }
                            }
                            
};

jQuery.GollumEditor.defineLanguage('creole', Creole);

})();