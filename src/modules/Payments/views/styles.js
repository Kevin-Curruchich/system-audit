const styles = `
.py-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
}

.container, .container-fluid, .container-xxl, .container-xl, .container-lg, .container-md, .container-sm {
    width: 100%;
    padding-right: var(--bs-gutter-x, 1.5rem);
    padding-left: var(--bs-gutter-x, 1.5rem);
    margin-right: auto;
    margin-left: auto;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0, 0, 0, 0.125);
    border-radius: 1rem;
}

.mx-auto {
    margin-right: auto !important;
    margin-left: auto !important;
}

@media (min-width: 768px)
.col-md-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
}

@media (min-width: 576px)
.col-sm-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
}

.p-4 {
    padding: 1.5rem !important;
}


.align-items-center {
    align-items: center !important;
}


.justify-content-center {
    justify-content: center !important;
}

.d-flex {
    display: flex !important;
}

.row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-0.5 * var(--bs-gutter-x));
    margin-left: calc(-0.5 * var(--bs-gutter-x));
}

.col-6 {
    flex: 0 0 auto;
    width: 50%;
}

.col-12 {
    flex: 0 0 auto;
    width: 100%;
}

.col-md-12 {
    flex: 0 0 auto;
    width: 100%;
}

.col-md-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
}

.card .card-body {
    font-family: "Open Sans", sans-serif;
    padding: 1.5rem;
}

.card-body {
    flex: 1 1 auto;
    padding: 1rem 1rem;
}

.el-table--large {
    font-size: 20px;
}

.el-table--fit {
    border-right: 0;
    border-bottom: 0;
}

.el-table {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: -moz-fit-content;
    height: fit-content;
    width: 100%;
    max-width: 100%;
    background-color: var(--el-table-bg-color);
    font-size: 14px;
    color: var(--el-table-text-color);
}

.el-table {
    --el-table-border-color: var(--el-border-color-lighter);
    --el-table-border: 1px solid var(--el-table-border-color);
    --el-table-text-color: var(--el-text-color-regular);
    --el-table-header-text-color: var(--el-text-color-secondary);
    --el-table-row-hover-bg-color: var(--el-fill-color-light);
    --el-table-current-row-bg-color: var(--el-color-primary-light-9);
    --el-table-header-bg-color: var(--el-bg-color);
    --el-table-fixed-box-shadow: var(--el-box-shadow-light);
    --el-table-bg-color: var(--el-fill-color-blank);
    --el-table-tr-bg-color: var(--el-fill-color-blank);
    --el-table-expanded-cell-bg-color: var(--el-fill-color-blank);
    --el-table-fixed-left-column: inset 10px 0 10px -10px rgba(0, 0, 0, 0.15);
    --el-table-fixed-right-column: inset -10px 0 10px -10px rgba(0, 0, 0, 0.15);
}

.p-2 {
    padding: 0.5rem !important;
}


.mb-2 {
    margin-bottom: 0.5rem !important;
}

.w-25 {
    width: 25% !important;
}

html * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

img, svg {
    vertical-align: middle;
}

.el-table__inner-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.el-table__column-resize-proxy {
    position: absolute;
    left: 200px;
    top: 0;
    bottom: 0;
    width: 0;
    border-left: var(--el-table-border);
    z-index: 10;
}   

.el-table .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
}   

.el-table__footer-wrapper, .el-table__header-wrapper {
    overflow: hidden;
}

.el-table__header-wrapper {
    flex-shrink: 0;
}

.el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {
    width: 100%;
}

.el-table__body-wrapper {
    overflow: hidden;
    position: relative;
    flex: 1;
}

.el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {
    width: 100%;
}

h4, .h4, h5, .h5, h6, .h6 {
    font-weight: 600;
}

h6, .h6 {
    font-size: 1.5rem;
    line-height: 1;
}

p {
    font-size: 1.2rem;
}

.text-end {
    text-align: right !important;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
    transition: background-color .25s ease;
}

.el-table:not(.el-table--border) .el-table__cell {
    border-right: none;
}

.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
    border-bottom: var(--el-table-border);
}

.el-table--large .el-table__cell {
    padding: 12px 0;
}

.el-table td.el-table__cell div {
    box-sizing: border-box;
}

.el-table--large .cell {
    padding: 0 16px;
}

.el-table .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    padding: 0 12px;
}

.text-center-cell {
    text-align: center !important;
}

`;

export default styles;
