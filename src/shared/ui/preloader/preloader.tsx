import styles from './preloader.module.scss'

export const Loader = () => {
  return (
    <div className={styles.overlay}>
      <span className={styles.loader}></span>
    </div>
  )
}
