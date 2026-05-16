import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'link'

type BaseProps = {
  variant?: Variant
  children: ReactNode
  arrow?: boolean
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export default function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', children, arrow = true, className = '', ...rest } = props as BaseProps & { href?: string }
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : 'btn-link'
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden>→</span>}
    </>
  )
  if ('href' in rest && rest.href) {
    return <a className={`${cls} ${className}`} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{content}</a>
  }
  return <button className={`${cls} ${className}`} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{content}</button>
}
