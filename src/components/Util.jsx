export function AbbrContent({content, abbr}) {
    return abbr ? <abbr title={abbr}>{content}</abbr> : content
}