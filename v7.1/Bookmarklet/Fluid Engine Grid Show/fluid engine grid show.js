( ( ) => {

  /*
  
    fluid engine grid show
    
    License       : < https://tinyurl.com/s872fb68 >
    
    Version       : 0.1.0
    
    By            : Thomas Creedon < http://www.tomsWeb.consulting/ >
    
    no user serviceable parts below
    
    */
    
  // begin console message
  
    const title = 'Fluid Engine Grid Show';
    
    let version = '0.1.0';
    
    const s = `${ title } v${ version }, ` +
    
      'License < https://tinyurl.com/s872fb68 >, ' +
      
      'Tom\'s Web Consulting < http://www.tomsWeb.consulting >';
      
    console.log ( s );
    
    // end console message
    
  // begin bail if no mutation observer available
  
    const b = ! ( 'MutationObserver' in window );
    
    if ( b ) return;
    
    // end bail if no mutation observer available
    
  version = Static
  
    .SQUARESPACE_CONTEXT
    
    .templateVersion;
    
  if ( version != '7.1' ) return; // bail if not 7.1
  
  // begin site document
  
    const l = document
    
      .querySelectorAll ( '.squarespace-config' )
      
      .length;
      
    let siteDocument;
    
    if ( l ) {
    
      const selector = 'iframe#sqs-site-frame';
      
      siteDocument = document
      
        .querySelector ( selector )
        
        .contentDocument;
        
      } else
      
        siteDocument = document;
        
    // end site document
    
  const activeClassName = 'sqs-edit-mode-active';
  
  const isEditingSelector = '.fluid-engine.is-editing';
  
  const selector = `.${ activeClassName } ${ isEditingSelector }`;
  
  const elements = siteDocument
  
    .querySelectorAll ( selector );
    
  if ( ! elements.length ) return; // bail if no elements
  
  const codeKey = 'twc-fegs';
  
  // begin initialize fegs
  
    if ( window.twc === undefined ) window.twc = { }; // initialize twc global
    
    if ( twc.fegs === undefined ) // initialize fegs
    
      twc.fegs = {
      
        active : false,
        
        observe : false
        
        };
        
    // end initialize fegs
    
  // begin style
  
    let style = siteDocument
    
      .querySelector ( `#${ codeKey }` );
      
    if ( style === null ) {
    
      style = siteDocument
      
      .createElement ( 'style' );
      
      style.setAttribute ( 'id', codeKey );
      
      style.innerHTML = `${ selector }[ data-${ codeKey } ] .fe-grid-row {
      
        opacity : 0.65;
        
        }
        
      `;
      
      siteDocument
      
        .head
        
        .appendChild ( style );
        
      }
      
    // end style
    
  // deactivate
  
  if ( twc.fegs.active ) {
  
    const callback = ( element ) => {
    
      element
      
        .removeAttribute ( `data-${ codeKey }` );
        
      };
      
    elements
      
      .forEach ( callback );
      
    twc
    
      .fegs
      
      .active = false;
      
    return;
    
    }
    
  // begin activate
  
    const callback = ( element ) => {
    
      element
      
        .setAttribute ( `data-${ codeKey }`, '' );
        
      };
      
    elements
      
      .forEach ( callback );
      
    if ( ! twc.fegs.observe ) {
    
      // begin observe body
      
        const attribute = 'class';
        
        const config = {
        
          attributeFilter : [ attribute ]
          
          };
          
        const callback = ( mutations ) => {
        
          const callback = ( mutation ) => {
          
            if ( ! twc.fegs.observe ) return; // bail observe not attribute
            
            // bail if not attribute
            
            if ( mutation.attributeName != attribute ) return;
            
            const b = mutation
            
              .target
              
              .classList
              
              .contains ( activeClassName );
              
            if ( b ) return; // bail if edit mode active
            
            observer.disconnect ( );
            
            twc.fegs = {
            
              active : false,
              
              observe : false
              
              }
              
            };
            
          mutations.forEach ( callback );
            
          };
          
        let observer = new MutationObserver ( callback );
        
        // start listening for changes in body
        
        observer.observe ( siteDocument.body, config );
        
        twc.fegs.observe = true;
        
        // end observe body
        
      }
      
    twc.fegs.active = true;
    
    // end activate
    
  } ) ( );
