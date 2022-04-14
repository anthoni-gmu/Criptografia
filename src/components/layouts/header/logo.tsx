import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <div className="">
            <Link href={'/'}>
                  <a >
                    <Image
                      className="h-8 w-auto sm:h-10"
                      src={"/assets/logo_utp.png"}
                      height="45px"
                      width="250px"
                      layout="intrinsic"
                      alt='logo aton'
                      quality={100}
                    />
                  </a>
                </Link>
        </div>
    )
}

export default Logo
