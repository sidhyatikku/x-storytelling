function makeCircleHoleClipPathRule( radius ) {

  const inner_path = [];
  const circumference = Math.PI * radius;
  const step = Math.PI * 2 / circumference;
  // we are coming from top-left corner
  const start_step = circumference * (5 / 8);
  for( let i = start_step; i < circumference + start_step; i++ ) {
    const angle = step * i;
    const x = radius * Math.cos( angle );
    const y = radius * Math.sin( angle );
    const str = `calc( 50% + ${ x }px ) calc( 50% + ${ y }px )`;
    inner_path.push( str );
  }
  // avoid rounding issues
  inner_path.push( inner_path[ 0 ] );

  return `polygon( evenodd,
    /* outer rect */
    0 0,       /* top - left */
    100% 0,    /* top - right */
    100% 100%, /* bottom - right */
    0% 100%,   /* bottom - left */
    0 0,       /* and top - left again */
    ${ inner_path.join( "," ) }
   )`;

}

const blur_elem = document.getElementById( "blur-around" );
// set the clip-path rule
blur_elem.style.clipPath = makeCircleHoleClipPathRule( 300 );

document.onmousemove = (evt) => {
  blur_elem.style.transform = `translate(${evt.clientX}px, ${evt.clientY}px)`;
};
