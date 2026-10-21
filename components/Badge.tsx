export default function Badge() {
  return (
    <a href="#proprietati" className="badge" aria-label="Vezi proprietățile">
      <svg className="badge-ring" viewBox="0 0 116 116" width="116" height="116" aria-hidden="true">
        <defs>
          <path id="im-circle" d="M58,58 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="58" cy="58" r="57" fill="none" stroke="#CFCFCB" />
        <text className="badge-text">
          <textPath href="#im-circle">Casa ta începe aici · Immonica · </textPath>
        </text>
      </svg>
      <span className="badge-arrow" aria-hidden="true">↗</span>
    </a>
  );
}
